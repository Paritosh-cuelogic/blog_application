import { useState, useEffect, useMemo } from "react";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import { LOAD_BLOGS } from "../components/graphql/queries";

import { useQuery, gql } from "@apollo/client";
import { client } from "../components/graphql/config";

function HomePage(props) {
  const { error, loading, data } = useQuery(LOAD_BLOGS, {
    client,
  });

  if (loading) {
    return <h1>Loading please wait....</h1>;
  }
  return (
    <>
      <Head>
        <title>Welcome to blog application</title>
        <meta property="og:title" content="Blog application" key="title" />
      </Head>
      <MeetupList meetups={data.blogs} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   return {
//     props: { meetupList: DUMMY_MEETUP },
//     // revalidate: 5,
//   };
// }
export async function getStaticProps() {
  const { data } = await client.query({
    query: LOAD_BLOGS,
  });
  console.log(data);
  return { props: {} };
}
// export async function getStaticProps() {
//   const responce = await fetch(`http://localhost:1337/blogs`);
//   const data1 = await responce.json();
//   const meetUpList = data1.map((meetup) => ({
//     id: meetup.id,
//     image: `http://localhost:1337${meetup.banner.url}`,
//     title: meetup.title,
//     address: meetup.body,
//   }));
//   return {
//     props: { meetupList: meetUpList },
//     // revalidate: 10,
//   };
// }

export default HomePage;
