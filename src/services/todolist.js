import axios from 'axios';

const api = process.env.NEXT_PUBLIC_API;

export const getAllTodos = async () => {
  try {
    const response = await axios.get(`${api}/todolist/all`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getTodoById = async (id) => {
  try {
    const response = await axios.get(`${api}/todolist/${id}?size=100`);
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const getTodosByUser = async (user) => {
  try {
    const response = await axios.get(`${api}/todolist?user=${user}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getTodosByTitle = async (title) => {
  try {
    const response = await axios.get(`${api}/todolist?title=${title}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${api}/todolist/category`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getTodosByCategory = async (user, categoryId) => {
  try {
    const response = await axios.get(
      `${api}/todolist?user=${user}&categoryId=${categoryId}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const addTodolist = async (payload) => {
  const arrPayload = [];
  payload.forEach((value, key) => {
    if (!value) {
      arrPayload.push(key);
    }
  });

  if (arrPayload.length > 0) {
    return { status: false, error: `${arrPayload.join(', ')} tidak valid` };
  }

  try {
    const response = await axios.post(`${api}/todolist`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};
export const editTodolist = async (id, payload) => {
  const arrPayload = [];
  payload.forEach((value, key) => {
    if (!value) {
      arrPayload.push(key);
    }
  });

  if (arrPayload.length > 0) {
    return { status: false, error: `${arrPayload.join(', ')} tidak valid` };
  }

  try {
    const response = await axios.put(`${api}/todolist/${id}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteTodolist = async (id) => {
  try {
    const response = await axios.patch(`${api}/todolist/${id}`);
    return response.data.status;
  } catch (error) {
    console.log(error);
  }
};

export const getTrash = async () => {
  try {
    const response = await axios.get(`${api}/todolist/trash`);
    return response.data;
  } catch (error) {}
};

export const restoreDeleteTodolist = async (id) => {
  try {
    const response = await axios.patch(`${api}/todolist/restore/${id}`);
    return response.data;
  } catch {
    return response.data;
  }
};

export const permanentDeleteTodolist = async (id) => {
  try {
    const response = await axios.delete(`${api}/todolist/${id}`);
    return response.data;
  } catch {
    return response.data;
  }
};

export const deleteCategoryById = async (id) => {
  try {
    const response = await axios.delete(`${api}/todolist/category/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addNewCategory = async (name, token) => {
  try {
    const response = await axios.post(
      `${api}/todolist/category`,
      {
        name: name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateCategory = async (id,name, token) => {
  try {
    const response = await axios.put(
      `${api}/todolist/category/${id}`,
      {name: name},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
