import { useRouter } from "next/router";
import Image from "next/image";
import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";

function MeetupItem(props) {
  const router = useRouter();
  function showDetailsHandler() {
    router.push(`/${props.id}`);
  }
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <Image
            src={`http://localhost:1337${props.image}`}
            alt={props.title}
            height="1000"
            width="1000"
          />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
