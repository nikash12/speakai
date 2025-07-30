import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:2001/api/login", { username, password });
      console.log(res.data.token); 
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.returnedUsername);
      localStorage.setItem("userId", res.data.userId);
      alert("Login successful!");
      navigate('/')
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin} className="w-full max-w-sm mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">
        Login
      </button>
    </form>
  );
}
