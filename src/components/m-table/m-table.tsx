import { Button, Flex, Stack } from '@mantine/core'
import type { MRT_RowData, MRT_TableOptions } from 'mantine-react-table'
import { MantineReactTable } from 'mantine-react-table'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { ErrorAlert } from '../error-alert/error-alert'

interface TableProps<T extends MRT_RowData> extends MRT_TableOptions<T> {
    isError?: boolean
    loading?: boolean
    editM?: (id: number) => void
    deleteM?: (id: number) => void
    errorText?: string
    goTo?: (id: string) => void
    onCreate?: () => void
}

export const MTable = <TData extends MRT_RowData>({
    loading,
    isError,
    editM,
    deleteM,
    errorText,
    goTo,
    ...otherProps
}: TableProps<TData>) => {
    return (
        <Stack>
            {isError && <ErrorAlert>{errorText}</ErrorAlert>}
            <MantineReactTable
                enableColumnActions={true}
                enableTableFooter={true}
                enableStickyHeader={true}
                enableBottomToolbar={true}
                enablePagination={true}
                paginationDisplayMode="pages"
                enableRowNumbers={true}
                enableFullScreenToggle={true}
                enableColumnFilters={true}
                enableHiding={true}
                enableDensityToggle={true}
                enableRowActions={true}
                mantineTableBodyRowProps={({ row }) => ({
                    onClick: () => {
                        if (goTo !== undefined) {
                            goTo(row.original.id)
                        }
                    },
                })}
                initialState={{
                    isLoading: loading,
                    density: 'xs',
                    showGlobalFilter: true,
                    columnVisibility: {
                        id: false,
                    },
                }}
                mantineTableProps={{
                    highlightOnHover: true,
                    withColumnBorders: true,
                    striped: true,
                }}
                mantineTableHeadCellProps={{
                    style: {
                        height: '58px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: '14px',
                        color: 'var(--mantine-color-gray-7)',
                        paddingLeft: '15px',
                        background: 'var(--mantine-color-gray-1)',
                    },
                }}
                mantineTableBodyCellProps={{
                    style: {
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 400,
                        fontSize: '14px',
                        color: '#1B2128',
                        lineHeight: '16.94px',
                        paddingLeft: '15px',
                    },
                }}
                renderRowActions={({ row }) => (
                    <Flex>
                        {true && (
                            <Button
                                variant="transparent"
                                p={0}
                                onClick={() => editM && editM(row.original.id)}
                            >
                                <HiOutlinePencil size={24} color="#D97706" />
                            </Button>
                        )}
                        {deleteM && (
                            <Button
                                variant="transparent"
                                p={0}
                                ml={10}
                                onClick={() => deleteM(row.original.id)}
                            >
                                <HiOutlineTrash size={24} color="#E11D48" />
                            </Button>
                        )}
                    </Flex>
                )}

                positionActionsColumn="last"
                mantinePaperProps={{
                    shadow: 'none',
                    style: {
                        borderRadius: '0',
                        border: '1px dashed #e0e0e0',
                        width: '100%',
                        overflow: 'hidden'
                    },
                }}
                mantineTableContainerProps={{
                    style: {
                        width: '100%',
                        overflowX: 'auto',
                        position: 'relative'
                    }
                }}
                mantineTableFooterProps={{ style: { flexGrow: '0' } }}
                mantinePaginationProps={{
                    color: 'var(--mantine-color-blue-6)',
                    showRowsPerPage: true,
                }}
                mantineSearchTextInputProps={{
                    placeholder: 'Search all columns...',
                    style: { minWidth: '300px' },
                }}
                mantineFilterTextInputProps={{
                    placeholder: 'Filter value',
                    style: { minWidth: '200px' },
                }}
                {...otherProps}
            />
        </Stack>
    )
}
