import Category from "../../components/Category/Category"
import ExerciseList from "../../components/ExerciseList/ExerciseList"

export default function MainPage({ setUser }) {
  return (
    <>
    <h1>What Muscle Group are we working on Today?</h1>
    <aside>
      <Category />
    </aside>
      <ExerciseList />
    </>
  )
 
}