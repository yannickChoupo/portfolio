import React from 'react';
import { Link, makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
	footer: {
		backgroundColor: tokens.colorNeutralBackground2,
		padding: "20px",
		marginTop: "auto",
		borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
	},
	socialList: {
		display: "flex",
		justifyContent: "center",
		gap: "20px",
		listStyle: "none",
		padding: 0,
		margin: 0,
	},
	socialIcon: {
		fontSize: "24px",
		color: tokens.colorBrandForeground1,
		transition: "color 0.2s ease",
		":hover": {
			color: tokens.colorBrandForeground2,
		},
	},
});

const Footer: React.FC = () => {
	const styles = useStyles();

	return (
		<footer className={styles.footer}>
			<div>
				<ul className={styles.socialList}>
					<li>
						<Link 
							href="https://github.com/yannickChoupo"
							target="_blank"
							rel="noopener noreferrer"
							className={styles.socialIcon}
						>
							GitHub
						</Link>
					</li>
					<li>
						<Link 
							href="https://www.linkedin.com/in/yannick-njilo-794326205/"
							target="_blank"
							rel="noopener noreferrer"
							className={styles.socialIcon}
						>
							LinkedIn
						</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
