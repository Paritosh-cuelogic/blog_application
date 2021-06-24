import NewMeetupForm from "../../components/meetups/NewMeetupForm";
function NewMeetUp() {
  function addMeetUpHandler(meetUpData) {
    console.log(meetUpData);
  }
  return <NewMeetupForm onAddMeetup={addMeetUpHandler} />;
}

export default NewMeetUp;
