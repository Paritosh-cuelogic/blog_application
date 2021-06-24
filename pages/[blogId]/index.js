import { useRouter } from "next/router";
import Head from "next/head";
import MeetUpDetail from "../../components/meetups/MeetUpDetail";
import {
  LOAD_BLOGS_WITH_LIMIT,
  LOAD_BLOG_BY_ID,
} from "../../components/graphql/queries";
import { client } from "../../components/graphql/config";
function MeetUpDetailPage(props) {
  const router = useRouter();

  if (props.error) {
    return <p>Something went wrong.......</p>;
  }
  return (
    <>
      <Head>
        <title>{props.blog.title}</title>
      </Head>
      <MeetUpDetail
        id={props.blog.id}
        image={props.blog.image}
        title={props.blog.title}
        address={props.blog.address}
        description={props.blog.description}
        categories={props.blog.categories}
      />
    </>
  );
}

export async function getStaticPaths(context) {
  let paths = [];
  try {
    const { data } = await client.query({
      query: LOAD_BLOGS_WITH_LIMIT,
    });

    if (data.blogs) {
      paths = data.blogs.map((meetup) => ({
        params: { blogId: meetup.id.toString() },
      }));
    }
  } catch (error) {
    console.log(error);
  }

  return {
    fallback: "blocking",
    paths: paths,
  };
}

export async function getStaticProps(context) {
  try {
    const { data, error } = await client.query({
      query: LOAD_BLOG_BY_ID,
      variables: {
        id: context.params.blogId,
      },
    });

    return {
      props: {
        blog: {
          id: data.blog.id,
          image: data.blog.banner.url,
          title: data.blog.title,
          description: data.blog.body,
          categories: data.blog.categories,
        },
      },
      revalidate: 10 * 60,
    };
  } catch (error) {
    return {
      props: {
        error: true,
      },
    };
  }
}

export default MeetUpDetailPage;
