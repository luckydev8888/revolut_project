import { CircularProgress, DialogContent } from "@mui/material";
import { LoadingDialog } from "./styled";
import { useLoading } from "../contexts/LoadingContext";

export default function Loading() {
  const { wholeLoading } = useLoading();

  return (
    <LoadingDialog open={wholeLoading}>
      <DialogContent>
        <CircularProgress />
      </DialogContent>
    </LoadingDialog>
  );
}
