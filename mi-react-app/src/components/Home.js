import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Card, Spin } from 'antd';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);

  // Aquí debes definir el token que usarás para la autenticación
  const token = localStorage.getItem('token'); // Asegúrate de que el token se almacene correctamente

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Configura los encabezados para las solicitudes
        const headers = {
          Authorization: token, // Solo el token, sin 'Bearer'
        };

        // Obtener datos desde las APIs correspondientes
        const [productRes, userRes, roleRes, permissionRes] = await Promise.all([
          axios.get('http://localhost:3001/productos', { headers }),
          axios.get('http://localhost:3001/usuarios', { headers }),
          axios.get('http://localhost:3001/roles', { headers }),
          axios.get('http://localhost:3001/permissions', { headers }),
        ]);

        // Validar que la respuesta sea un array antes de establecer el estado
        setProducts(Array.isArray(productRes.data) ? productRes.data : []);
        setUsers(Array.isArray(userRes.data) ? userRes.data : []);
        setRoles(Array.isArray(roleRes.data) ? roleRes.data : []);
        setPermissions(Array.isArray(permissionRes.data) ? permissionRes.data : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [token]); // Dependencia añadida para que se ejecute si el token cambia

  const productColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Precio', dataIndex: 'precio', key: 'precio' },
    { title: 'Stock', dataIndex: 'stock', key: 'stock' },
  ];

  const userColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Rol', dataIndex: 'role', key: 'role' },
  ];

  const roleColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Nombre del Rol', dataIndex: 'name', key: 'name' },
  ];

  const permissionColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Permiso', dataIndex: 'name', key: 'name' },
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="dashboard">
      <h1>Panel de Administración</h1>

      <Card title="Productos" style={{ marginBottom: 20 }}>
        <Table dataSource={products} columns={productColumns} rowKey="id" />
      </Card>

      <Card title="Usuarios" style={{ marginBottom: 20 }}>
        <Table dataSource={users} columns={userColumns} rowKey="id" />
      </Card>

      <Card title="Roles" style={{ marginBottom: 20 }}>
        <Table dataSource={roles} columns={roleColumns} rowKey="id" />
      </Card>

      <Card title="Permisos" style={{ marginBottom: 20 }}>
        <Table dataSource={permissions} columns={permissionColumns} rowKey="id" />
      </Card>
    </div>
  );
};

export default Home;
