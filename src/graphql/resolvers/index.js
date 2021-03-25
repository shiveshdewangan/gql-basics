import axios from "axios";

const db = "http://localhost:3000";

const Query = {
  agent: async (parent, args, context, info) => {
    const id = args.id;
    const { data } = await axios.get(`http://localhost:3000/users/${id}`);
    return data;
  },
  agents: async (parent, args, context, info) => {
    const age = args.age;
    const name = args.name;
    const { data } = await axios.get(
      `http://localhost:3000/users?name=${name}&age=${age}`
    );
    return data;
  },
  posts: async (parent, args, context, info) => {
    const { data } = await axios.get(`http://localhost:3000/posts`);
    return data;
  },
  post: async (parent, args, context, info) => {
    const id = args.id;
    const response = await axios.get(`http://localhost:3000/posts/${id}`);
    return response.data;
  },
  pictures: async () => {
    const response = await axios.get(`http://localhost:3000/pictures`);
    return response.data;
  },
};

const Post = {
  author: async (parent, args, context, info) => {
    const response = await axios.get(
      `http://localhost:3000/users/${parent.author}`
    );
    return response.data;
  },
  picture: async (parent, args, context, info) => {
    const response = await axios.get(
      `http://localhost:3000/pictures/${parent.picture}`
    );
    return response.data;
  },
};

const User = {
  posts: async (parent, args, context, info) => {
    const response = await axios.get(
      `http://localhost:3000/posts?author=${parent.id}`
    );
    return response.data;
  },
};

const Picture = {
  author: async (parent, args, context, info) => {
    const response = await axios.get(
      `http://localhost:3000/users/${parent.author}`
    );
    return response.data;
  },
  post: async (parent, args, context, info) => {
    const response = await axios.get(
      `http://localhost:3000/posts/${parent.post}`
    );
    return response.data;
  },
};

const Mutation = {
  createAgent: async (parent, args, context, info) => {
    const response = await axios.post(`${db}/users`, {
      name: args.name,
      age: args.age,
      married: args.married,
      average: 0,
    });
    return response.data;
  },
  createPost: async (parent, args, context, info) => {
    const response = await axios.post(`${db}/posts`, {
      title: args.title,
      content: args.content,
      author: 1,
      picture: 1,
    });
    return response.data;
  },
  deletePost: async (parent, args, context, info) => {
    const response = await axios.delete(`${db}/posts/${args.id}`);
    if (Object.keys(response.data).length === 0) {
      return true;
    }
    return false;
  },
  deleteAgent: async (parent, args, context, info) => {
    const response = await axios.delete(`${db}/users/${args.id}`);
    if (Object.keys(response.data).length === 0) {
      return true;
    }
    return false;
  },
};

export { Query, Mutation, Post, User, Picture };
