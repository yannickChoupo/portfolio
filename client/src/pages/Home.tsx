import React from "react";
import { Link } from "react-router-dom";
import { Text, 
	// makeStyles, tokens
 } from "@fluentui/react-components";

// const useStyles = makeStyles({
// 	home: {
// 		display: "flex",
// 		flexDirection: "column",
// 		gap: "40px",
// 		padding: "20px",
// 	},
// 	header: {
// 		display: "flex",
// 		justifyContent: "center",
// 		alignItems: "center",
// 		minHeight: "200px",
// 		backgroundColor: tokens.colorNeutralBackground2,
// 		borderRadius: tokens.borderRadiusLarge,
// 	},
// 	image: {
// 		width: "150px",
// 		height: "150px",
// 		borderRadius: "50%",
// 		backgroundColor: tokens.colorBrandBackground,
// 	},
// 	body: {
// 		textAlign: "center",
// 		fontSize: "18px",
// 		lineHeight: "1.8",
// 		maxWidth: "800px",
// 		margin: "0 auto",
// 	},
// 	paragraph: {
// 		marginBottom: "24px",
// 	},
// 	link: {
// 		color: tokens.colorBrandForeground1,
// 		textDecoration: "none",
// 		fontWeight: "600",
// 		":hover": {
// 			color: tokens.colorBrandForeground2,
// 			textDecoration: "underline",
// 		},
// 	},
// 	strong: {
// 		color: tokens.colorBrandForeground1,
// 		fontWeight: "700",
// 	},
// });

const Home: React.FC = () => {
	// const styles = useStyles();

	return (
		<div id="home" className="home">
			<section className={"header"}>
				<div className={"image"} />
			</section>
			<section className={"body"}>
				<Text className={"paragraph"}>
					Hey there I'm <strong className={"strong"}>Yannick</strong>,<br />
					web developer <br />
					currently living in <strong className={"strong"}>Darmstadt</strong>,<br />
					where I am studying <strong className={"strong"}>electrical engineering</strong><br/>
					with a focus on systems automation at University of Darmstadt.
				</Text>
				<Text className={"paragraph"}>
					Through my personal interest <br />
					for web development <br />
					I learned different web technologies <br />
					most of the time on Google or websites like{" "}
					<a href="https://freecodecamp.org" className={"link"}>freeCodeCamp</a><br />
					where I usually read articles and complete challenges.<br />
					I have used some of the technologies I learned <br/>
					to build this website and some small applications<br />
					here are some of them
				</Text>
				<Link className={"link"} to='works'>
					<em>Demos</em>
				</Link>
				<Text className={"paragraph"}>
					I haven't yet got the opportunity to work in a professional team<br />
					For the moment just with friends <br/>
					and I am looking for an opportunity to use the skills I earned in a <br />
					more productive way.
				</Text>
				<Text className={"paragraph"}>
					I am really enjoying learning new things myself and also from others<br />
					so please if you have any advice that might help me to improve<br />
					consider leaving me a message.
				</Text>
				<Link className={"link"} to='contact'>
					<em>Drop a Message</em>
				</Link>
			</section>
		</div>
	);
};

export default Home;
