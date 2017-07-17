import React from 'react';
import './page.scss';

const Page = (props) => {
	const {title, subTitle, spacing, className, children, footer} = props;
	return (
		<section className={`page ${className}`}>
			<div className="page-head">
				<h1 className="page-title">{title}</h1>
				<p className="page-desc">{subTitle}</p>
			</div>
			<div className={`page-body ${spacing} ? page-body-spacing`}>
				{children}
			</div>
			{footer ? 
			<div className="page-footer">
				{footer}
			</div>
			: false}
		</section>
	);
};

export default Page;