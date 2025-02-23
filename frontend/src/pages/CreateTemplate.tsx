import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTemplate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic] = useState("Quiz");
  const [tags, setTags] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [questions, setQuestions] = useState([{ title: "", type: "string" }]);
  const navigate = useNavigate();

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].title = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { title: "", type: "string" }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/templates",
        { title, description, topic, tags: tags.split(","), isPublic, questions },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Template created successfully!");
      navigate("/dashboard");
    } catch {
      alert("Failed to create template.");
    }
  };

  return (
    <div className="container">
      <h2>Create Template</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="text" placeholder="Tags (comma-separated)" value={tags} onChange={(e) => setTags(e.target.value)} />

        <div>
          <label>Public</label>
          <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
        </div>

        <h3>Questions</h3>
        {questions.map((q, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Question ${index + 1}`}
            value={q.title}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            required
          />
        ))}
        <button type="button" onClick={addQuestion}>Add Question</button>

        <button type="submit">Create Template</button>
      </form>
    </div>
  );
};

export default CreateTemplate;
