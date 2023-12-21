import React from 'react';
import { Pagination } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PaginationBar = ({ pages, page, handlePageClick }) => {
	const pagesArray = Array.from({ length: pages || 1 }, (_, index) => index + 1);
	console.log('page, pages', page, pages);

	return (
		<Pagination className="justify-content-center py-5">
			<Pagination.Prev disabled={page == 1} onClick={() => handlePageClick(page - 1)}>
				<span aria-hidden="true">
					<FaChevronLeft />
				</span>
			</Pagination.Prev>

			{pagesArray.map((pageNumber) => (
				<Pagination.Item
					key={`page${pageNumber}`}
					active={pageNumber === page}
					onClick={() => handlePageClick(pageNumber)}
				>
					{pageNumber}
				</Pagination.Item>
			))}
			{/* <Pagination.Item href="#">1</Pagination.Item>
			<Pagination.Item href="#">2</Pagination.Item>
			<Pagination.Item href="#">3</Pagination.Item>
			<Pagination.Item href="#">4</Pagination.Item>
			<Pagination.Ellipsis />
			<Pagination.Item href="#">10</Pagination.Item> */}
			<Pagination.Next
				disabled={page == pages}
				onClick={() => handlePageClick(page + 1)}
			>
				<span aria-hidden="true">
					<FaChevronRight />
				</span>
			</Pagination.Next>
		</Pagination>
	);
};

export default PaginationBar;
