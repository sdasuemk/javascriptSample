const generateTable = (data, config) => {
    const tableContainer = document.getElementById('reportTable');
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headerRow = document.createElement('tr');
    config.forEach(column => {
        const th = document.createElement('th');
        th.textContent = column.HeaderName;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    data.forEach((rowData, rowIndex) => {
        const tr = document.createElement('tr');
        config.forEach((column) => {
            const td = document.createElement('td');
            let columnValue;

            if (typeof column.Column === 'function') {
                columnValue = column.Column(rowData);
            } else {
                columnValue = rowData[column.Column];
            }

            if (column.Merge) {
                if (rowIndex === 0 || rowData[column.Column] !== data[rowIndex - 1][column.Column]) {
                    let rowSpan = 1;
                    for (let i = rowIndex + 1; i < data.length; i++) {
                        if (rowData[column.Column] === data[i][column.Column]) {
                            rowSpan++;
                        } else {
                            break;
                        }
                    }
                    if (rowSpan > 1) {
                        td.setAttribute('rowspan', rowSpan);
                    }
                } else {
                    td.style.display = 'none';
                }
            }

            td.textContent = columnValue;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);
};

//input data

const inputData = [
    {
        "Organization": "Google",
        "UserId": "akumar",
        "UserName": "Ashok Kumar",
        "Department": "Sales",
        "Designation": "Sales",
        "CheckInTime": 1548909000000,
        "CheckOutTime": 1548945000000
    },
    {
        "Organization": "Google",
        "UserId": "akumar",
        "UserName": "Ashok Kumar",
        "Department": "Sales",
        "Designation": "Sales",
        "CheckInTime": 1549081800000,
        "CheckOutTime": 1549110600000
    },
    {
        "Organization": "FB",
        "UserId": "phanis",
        "UserName": "Phani Sai",
        "Department": "Sales",
        "Designation": "Sales",
        "CheckInTime": 1548909000000,
        "CheckOutTime": 1548945000000
    },
    {
        "Organization": "FB",
        "UserId": "phanis",
        "UserName": "Phani Sai",
        "Department": "Sales",
        "Designation": "Sales",
        "CheckInTime": 1549081800000,
        "CheckOutTime": 1549110600000
    },
    {
        "Organization": "FB",
        "UserId": "lakshmig",
        "UserName": "Laskhmi Gayathri",
        "Department": "Quality",
        "Designation": "QA Engineer",
        "CheckInTime": 1549081800000,
        "CheckOutTime": 1549110600000
    },
    {
        "Organization": "FB",
        "UserId": "lakshmig",
        "UserName": "Laskhmi Gayathri",
        "Department": "Quality",
        "Designation": "QA Engineer",
        "CheckInTime": 1549081800000,
        "CheckOutTime": 1549110600000
    }
];

//table configuration

const colConfig = [
    {
        HeaderName: 'Organization',
        Column: 'Organization',
        Merge: true
    },
    {
        HeaderName: 'Department',
        Column: 'Department',
        Merge: true
    },
    {
        HeaderName: 'UserName',
        Column: 'UserName',
        Merge: true
    },
    {
        HeaderName: 'Date',
        Column: ({ CheckInTime }) => {
            return moment(CheckInTime).format("DD/MM/YYYY");
        },
        Merge: false
    },
    {
        HeaderName: 'Time',
        Column: ({ CheckInTime, CheckOutTime }) => {
            const secs = (CheckOutTime - CheckInTime) / 1000;
            const hours = Math.floor(secs / 3600);
            const minutes = Math.floor((secs % 3600) / 60);
            return `${hours} Hrs ${minutes} Mins`;
        },
        Merge: false
    }
];

generateTable(inputData, colConfig);