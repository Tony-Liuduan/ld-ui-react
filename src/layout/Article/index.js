import React from 'react';
import classNames from 'classnames';
import './article.scss';
// contents
const Article = (props) => {
	const {className, children, ...other} = props;
	const cls = classNames({
		'ui-article': true,
		[className]: className
	});

	return (
		<article className={cls} {...other}>
			{children}
		</article>
	);
};

export default Article;