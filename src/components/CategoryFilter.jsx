import React from 'react'

const CategoryFilter = ({ category, onChange }) => {
	const categories = ['신규', '헬스케어', '물류', '여행'];
	return (
		<select className="border p-2 rounded-lg w-full sm:w-32"
			value={category}
			onChange={e => {
				const value = e.target.value;
				onChange(value === 'all' ? undefined : value);
			}}>
			<option value={'all'}>전체</option>
			{categories.map(category => (
				<option key={category} value={category}>{category}</option>
			))}
		</select>
	)
}

export default CategoryFilter