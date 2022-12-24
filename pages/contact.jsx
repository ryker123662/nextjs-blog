import React from "react";
import Head from "next/head";
import ContactForm from "../components/contact/contact-form";
import { Fragment } from "react";

const ContactPage = () => {
	return (
		<Fragment>
			<Head>
				<title>Contact Me</title>
				<meta
					name="description"
					content="Contact Me"
				/>
			</Head>
			<ContactForm />
		</Fragment>
	);
};

export default ContactPage;
