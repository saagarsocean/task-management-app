import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/tasks'); // Assuming backend API endpoint is '/tasks'
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/task/create', formData); // Assuming backend API endpoint is '/task/create'
      fetchTasks();
      handleCloseModal();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`/tasks/delete?_id=${taskId}`); // Assuming backend API endpoint is '/tasks/delete'
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <Button variant="primary" onClick={handleShowModal}>Add Task</Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" placeholder="Enter title" onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" placeholder="Enter description" onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
      <hr />
      <h3>Tasks</h3>
      <ul className="list-group">
        {tasks.map((task) => (
          <li className="list-group-item" key={task._id}>
            <div>Title: {task.title}</div>
            <div>Description: {task.description}</div>
            <Button variant="danger" onClick={() => handleDelete(task._id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
