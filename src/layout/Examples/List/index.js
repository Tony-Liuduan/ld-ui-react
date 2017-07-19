import React from 'react';
import Page from '../../Page/index';
import {
	Cells,
	CellsTitle,
	Cell,
	CellIcon,
	CellContent,
	CellExtra,
	CellArrow,
	CellLabel,
	CellControl,
	CellClear,
	CellTip	
} from '../../Cell/index';

import Icon from './imgs/test.png';

const ListPage = (props) => {

	return (
		<Page title="List" subTitle="列表" className="cell">
			<Cells>
				<CellsTitle>CellContent & CellExtra</CellsTitle>
				<Cell>
					<CellIcon>
						<img src={Icon} alt=""/>
					</CellIcon>
					<CellContent>CellContent</CellContent>
					<CellExtra>CellExtra</CellExtra>
					<CellArrow />
				</Cell>

				<Cell>
					<CellContent>CellContent</CellContent>
					<CellExtra>CellExtra</CellExtra>
					<CellArrow direction="bottom" />
				</Cell>

				<Cell>
					<CellContent>CellContent</CellContent>
					<CellArrow direction="right" />
				</Cell>

				<Cell>
					<CellContent>CellContent</CellContent>
					<CellExtra>CellExtra</CellExtra>
				</Cell>
			</Cells>
			
			<Cells>
				<CellsTitle>CellLabel & CellControl</CellsTitle>
				<Cell>
					<CellLabel>CellLabel</CellLabel>
					<CellControl>CellControl</CellControl>
					<CellClear/>
					<CellTip>万</CellTip>
				</Cell>

				<Cell>
					<CellLabel>CellLabel</CellLabel>
					<CellControl>CellControl</CellControl>
					<CellClear/>
					<CellArrow direction="bottom"/>
				</Cell>

				<Cell>
					<CellLabel>CellLabel</CellLabel>
					<CellControl>CellControl</CellControl>
					<CellClear/>
				</Cell>

				<Cell>
					<CellLabel>
						<img src={Icon} alt=""/>
						<span>CellLabel</span>
					</CellLabel>
					<CellControl>CellControl</CellControl>
					<CellClear/>
				</Cell>
			</Cells>
		</Page>	
	);
};

export default ListPage;