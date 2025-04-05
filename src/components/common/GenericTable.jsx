/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

import { EyeOutlined, EyeInvisibleOutlined, DownOutlined } from '@ant-design/icons';
import { Descriptions, Flex, Table, Button, Dropdown } from 'antd';



const GenericTable = ({
    dataSource,
    loading,
    columns,
    ...restProps
}) => {
    const [tableColumns, setTableColumns] = useState([]);
    const [expandableData, setExpandableData] = useState([]);
    const [visibleColumns, setVisibleColumns] = useState(
        new Set(columns.map((col) => col.key))
    );

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            let totalWidth = 0;
            const fitColumns = [];
            const remainingData = [];

            columns?.forEach((column) => {
                if (!visibleColumns.has(column.key)) return;

                const colWidth = column.width ? column.width : 200; // Default width if not provided
                if (totalWidth + colWidth <= screenWidth) {
                    fitColumns.push(column);
                    totalWidth += colWidth;
                } else {
                    remainingData.push({
                        title: column.title,
                        dataIndex: column.dataIndex,
                        key: column.key,
                        render: column.render,
                        sorter: column.sorter,
                    });
                }
            });

            setTableColumns(fitColumns);
            setExpandableData(remainingData);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call

        return () => window.removeEventListener('resize', handleResize);
    }, [dataSource, columns, visibleColumns]);

    const toggleColumnVisibility = (key) => {
        setVisibleColumns(prev => {
            const newSet = new Set(prev);
            if (newSet.has(key)) {
                newSet.delete(key);
            } else {
                newSet.add(key);
            }
            return newSet;
        });
    };

    const expandableRowRender = (record) => (
        <Descriptions layout="horizontal">
            {expandableData.map((data) => (
                <Descriptions.Item
                    key={data.key}
                    span={24}
                    labelStyle={{ fontWeight: 'bold' }}
                    label={data.title}
                >
                    <Flex className="w-full" align="center">
                        {data.render
                            ? data.render(record[data.dataIndex], record)
                            : record[data.dataIndex]}
                    </Flex>
                </Descriptions.Item>
            ))}
        </Descriptions>
    );

    const list = columns
        .map((column) =>
            column.visibilityToggle
                ? {
                      key: column.key,
                      label: (
                          <Button
                              type="text"
                              icon={
                                  visibleColumns.has(column.key) ? (
                                      <EyeOutlined />
                                  ) : (
                                      <EyeInvisibleOutlined />
                                  )
                              }
                              onClick={() => toggleColumnVisibility(column.key)}
                          >
                              {column.title}
                          </Button>
                      ),
                  }
                : null
        )
        .filter(Boolean);
    const items = list?.length ? list : [];

    return (
        <>
            <Flex style={{ marginBottom: 10 }} wrap="wrap" align="center" justify="space-between">
                <Flex className="hidden md:block">
                    {columns.map(
                        (column) =>
                            column.visibilityToggle && (
                                <Button
                                    key={column.key}
                                    icon={
                                        visibleColumns.has(column.key) ? (
                                            <EyeOutlined />
                                        ) : (
                                            <EyeInvisibleOutlined />
                                        )
                                    }
                                    onClick={() => toggleColumnVisibility(column.key)}
                                    style={{ margin: '0 8px 8px 0' }}
                                >
                                    {column.title}
                                </Button>
                            )
                    )}
                </Flex>
                <Flex className="md:hidden w-full">
                    {list.length ? (
                        <Dropdown menu={{ items }} trigger={['click']}>
                            <Button>
                                Columns <DownOutlined />
                            </Button>
                        </Dropdown>
                    ) : (
                        ''
                    )}
                </Flex>
            </Flex>
            <Table
                columns={tableColumns}
                dataSource={dataSource}
                pagination={false}
                loading={loading}
                expandable={
                    expandableData.length > 0
                        ? {
                              expandedRowRender: expandableRowRender,
                          }
                        : false
                }
                {...restProps}
            />
        </>
    );
};

export default GenericTable;
