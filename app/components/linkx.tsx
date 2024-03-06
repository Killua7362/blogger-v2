import { FaInstagram, FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { SiMyanimelist, SiGmail } from "react-icons/si";

const Linx = () => {
	return (
		<div className="flex pt-2 gap-4">
			<a
				tabIndex="-1"
				href="https://github.com/Killua7362"
				target="_blank"
				rel="noopener noreferrer"
				className="text-[30px]"
			>
				<FaGithub />
			</a>
			<a
				tabIndex="-1"
				href="https://twitter.com/Killua7362"
				target="_blank"
				rel="noopener noreferrer"
				className="text-text"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="30"
					height="30"
					fill="none"
					viewBox="0 0 512 512"
					id="twitter"
				>
					<g clipPath="url(#clip0_84_15697)">
						<rect width="512" height="512" fill="#000" rx="60"></rect>
						<path
							fill="#fff"
							d="M355.904 100H408.832L293.2 232.16L429.232 412H322.72L239.296 302.928L143.84 412H90.8805L214.56 270.64L84.0645 100H193.28L268.688 199.696L355.904 100ZM337.328 380.32H366.656L177.344 130.016H145.872L337.328 380.32Z"
						></path>
					</g>
					<defs>
						<clipPath id="clip0_84_15697">
							<rect width="512" height="512" fill="#fff"></rect>
						</clipPath>
					</defs>
				</svg>
			</a>
			<a
				tabIndex="-1"
				href="https://www.linkedin.com/in/killua7362/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-text"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="30"
					height="30"
					viewBox="0 0 72 72"
					id="linkedin"
				>
					<g fill="none" fillRule="evenodd">
						<g>
							<rect width="72" height="72" fill="#117EB8" rx="4"></rect>
							<path
								fill="#FFF"
								d="M13.139 27.848h9.623V58.81h-9.623V27.848zm4.813-15.391c3.077 0 5.577 2.5 5.577 5.577 0 3.08-2.5 5.581-5.577 5.581a5.58 5.58 0 1 1 0-11.158zm10.846 15.39h9.23v4.231h.128c1.285-2.434 4.424-5 9.105-5 9.744 0 11.544 6.413 11.544 14.75V58.81h-9.617V43.753c0-3.59-.066-8.209-5-8.209-5.007 0-5.776 3.911-5.776 7.95V58.81h-9.615V27.848z"
							></path>
						</g>
					</g>
				</svg>
			</a>
			<a tabIndex="-1" href="mailto:bhat7362@gmail.com">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="30"
					height="30"
					enableBackground="new 0 0 141.7 141.7"
					viewBox="0 0 141.7 141.7"
					id="gmail"
				>
					<path
						fill="#4285f4"
						d="M24.3,111.3h17.2V69.6L16.9,51.3V104C16.9,108,20.2,111.3,24.3,111.3z"
					></path>
					<path
						fill="#34a853"
						d="M100.3,111.3h17.2c4.1,0,7.4-3.3,7.4-7.4V51.3l-24.5,18.4V111.3z"
					></path>
					<path
						fill="#fbbc04"
						d="M100.3,37.8v31.9l24.5-18.4v-9.8c0-9.1-10.4-14.3-17.7-8.8L100.3,37.8z"
					></path>
					<path
						fill="#ea4335"
						fillRule="evenodd"
						d="M41.4,69.6V37.8l29.4,22.1l29.4-22.1v31.9L70.9,91.7L41.4,69.6z"
						clipRule="evenodd"
					></path>
					<path
						fill="#c5221f"
						d="M16.9,41.4v9.8l24.5,18.4V37.8l-6.9-5.2C27.3,27.2,16.9,32.4,16.9,41.4z"
					></path>
				</svg>
			</a>
		</div>
	);
};

export default Linx;
