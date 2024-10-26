import React, { useState, useEffect } from 'react';
import './App.css';
import request from './request';
import { Card } from './components/card';
import { Form } from './components/form';

function App() {
  const [data, setData] = useState([]);

  // Ma'lumotlarni yuklab olish
  useEffect(() => {
    request.get("/todos").then((res) => {
      setData(res.data);
    });
  }, []);

  // Yangi element qo'shish
  const addItem = (newItem) => {
    request
      .post("/todos", newItem)
      .then((res) => {
        setData((prevData) => [...prevData, res.data]);
      })
      .catch((err) => {
        console.error("Error adding new item:", err);
      });
  };

  // Elementni o'chirish
  const removeItem = (id) => {
    request.delete(`todos/${id}`).then(() => {
      setData((prevData) => prevData.filter((item) => item.id !== id));
    });
  };

  // Elementni tahrirlash
  const editItem = (id) => {
    const newTitle = prompt("Yangi sarlavhani kiriting:");
    const newDescription = prompt("Yangi ta'rifni kiriting:");
    
    if (newTitle && newDescription) {
      const updatedItem = { id, title: newTitle, description: newDescription };
      
      request
        .put(`todos/${id}`, updatedItem)
        .then((res) => {
          setData(
            data.map((item) => (item.id === id ? res.data : item))
          );
        })
        .catch((err) => {
          console.error("Error updating item:", err);
        });
    }
  };

  return (
    <>
      <section className='block'>
        <div className='container'>
          <Form onAdd={addItem} />
          <div>
            {data?.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                onDelete={removeItem}
                onEdit={editItem}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
