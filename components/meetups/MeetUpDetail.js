import Image from "next/image";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_BLOG } from "../../components/graphql/mutations";

function MeetUpDetail(props) {
  // console.log(props);
  const [showForm, setShowForm] = useState(false);

  const [blogTitle, setBlogTitle] = useState(props.title);
  const [blogBody, setBlogBody] = useState(props.description);

  const [blogTitleDefault, setBlogTitleDefault] = useState(props.title);
  const [blogBodyDefault, setBlogBodyDefault] = useState(props.description);

  const [updateBlog, { data }] = useMutation(UPDATE_BLOG);

  const updateBlogHandler = (event) => {
    event.preventDefault();
    setShowForm(!showForm);
  };
  const updateTitleHandler = (event) => {
    setBlogTitle(event.target.value);
  };
  const updateBodyHandler = (event) => {
    setBlogBody(event.target.value);
  };
  const formUpdateHandler = async (event) => {
    event.preventDefault();
    const res = await updateBlog({
      variables: {
        id: props.id,
        title: blogTitle,
        body: blogBody,
      },
    });
    setBlogTitle(res.data.updateBlog.blog.title);
    setBlogBody(res.data.updateBlog.blog.body);
    setBlogTitleDefault(res.data.updateBlog.blog.title);
    setBlogBodyDefault(res.data.updateBlog.blog.body);
    setShowForm(!showForm);
  };
  const categoryList = props.categories.map((category) => {
    return <span>{category.name},</span>;
  });

  return (
    <>
      <Image
        src={`http://localhost:1337${props.image}`}
        alt={props.title}
        height="400"
        width="1000"
      />
      {showForm ? (
        <form onSubmit={formUpdateHandler}>
          <div>
            <label>Title: </label>
            <input
              type="text"
              name="title"
              value={blogTitle}
              onChange={updateTitleHandler}
            />
          </div>
          <div>
            <label>Body: </label>
            <textarea value={blogBody} onChange={updateBodyHandler}></textarea>
          </div>
          <div>
            <input type="submit" value="Update" />
          </div>
        </form>
      ) : null}
      <h1>{blogTitleDefault}</h1>
      <a href="/" onClick={updateBlogHandler}>
        Update
      </a>
      <p>{blogBodyDefault}</p>
      Categories : {categoryList}
    </>
  );
}

export default MeetUpDetail;
