import React from "react";
import { Pagination, Stack } from "@mui/material";

const PaginationComp = ({ page, totalPages, onPageChange }) => {
  return (
    <Stack spacing={2} sx={{ mt: 4, mb: 4, alignItems: "center" }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => onPageChange(value)}
        color="primary"
        shape="rounded"
        size="large"
      />
    </Stack>
  );
};

export default PaginationComp;
