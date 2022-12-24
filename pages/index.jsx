import { Fragment } from "react";
import Head from "next/head";
import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import { getFeaturedPosts } from "../lib/post-util";

const HomePage = (props) => {
	return (
		<Fragment>
			<Head>
				<title>Mia's Blog</title>
				<meta
					name="description"
					content="My cat is wierd"
				/>
			</Head>
			<Hero />
			<FeaturedPosts posts={props.posts} />
		</Fragment>
	);
};

export function getStaticProps() {
	const featuredPosts = getFeaturedPosts();
	return {
		props: {
			posts: featuredPosts,
		},
	};
}

export default HomePage;
