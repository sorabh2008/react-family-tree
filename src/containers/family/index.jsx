import React, { useEffect, useState } from 'react';
import { TreeTable, TreeState } from 'cp-react-tree-table';


const MOCK_DATA = [
    {
        data: { name: 'Company I', age: 105 },
        children: [
            {
                data: { name: 'Department 1', age: 75 },
            },
        ]
    },
];

function FamilyContainer() {
    const [myFamTree, myFamTreeSet] = useState(MOCK_DATA);
    const [treeValue, treeValueSet] = useState([]);
    useEffect(() => {
        treeValueSet(TreeState.create(MOCK_DATA));
    }, [myFamTree]);

    const handleOnChange = (newValue) => {
        treeValueSet(newValue);
    }

    const renderNameCell = (row) => {
        return (
            <span>{row.data.name}</span>
        );
    };
    const renderIndexCell = (row) => {
        return (
            <div style={{ paddingLeft: (row.metadata.depth * 15) + 'px' }}
                className={row.metadata.hasChildren ? 'with-children' : 'without-children'}>

                {(row.metadata.hasChildren)
                    ? (
                        <button className="toggle-button" onClick={row.toggleChildren}></button>
                    )
                    : ''
                }

                <span>{row.data.name}</span>
            </div>
        );
    }
    const renderEditableCell = (row) => {
        return (
            <input type="text" value={row.data.contact}
                onChange={(event) => {
                    row.updateData({
                        ...row.data,
                        contact: event.target.value,
                    });
                }} />
        );
    }
    const addChildToRow = (row) => {
        console.log("MYFAM", myFamTree, row);
        const famm = myFamTree.find((fam) => fam.data.name === row.data.name);
        console.log("Found --", famm);
        famm.children.push({data: {name: "Sachin", age: 50}});
        myFamTreeSet(famm);
    }
    const renderAddCell = (row) => {
        return <button onClick={() => addChildToRow(row)}>ADD</button>
    }
    return (<div>
        Family Container
        <TreeTable
            value={treeValue}
            onChange={handleOnChange}>

            <TreeTable.Column basis="150px" grow="0"
                renderCell={renderIndexCell}
                renderHeaderCell={() => <span>Expand</span>} />
            <TreeTable.Column basis="180px" grow="0"
                renderCell={renderNameCell}
                renderHeaderCell={() => <span>Name</span>} />
            <TreeTable.Column
                renderCell={renderEditableCell}
                renderHeaderCell={() => <span>Age</span>} />
            <TreeTable.Column
                renderCell={renderAddCell}
                renderHeaderCell={() => <span>ADD</span>} />


        </TreeTable>
    </div>);
}

export default FamilyContainer;