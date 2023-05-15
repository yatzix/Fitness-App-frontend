import Timer from "../../components/Timer/Timer";
import TodosList from "../../components/TodosList/TodosList";

export default function MainPage({ setUser }) {
  return (
    <>
      <Timer />
      <TodosList />
    </>
  );
}
