import { Box, Link, Stack } from "@mui/material";
import { Icon } from "@iconify/react";

export default function Image({ imgSrc }: { imgSrc?: string }) {
  return (
    <>
      {imgSrc ? (
        <Link target="_blank" href={imgSrc}>
          <Box
            component="img"
            src={imgSrc}
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              objectFit: "cover",
            }}
          />
        </Link>
      ) : (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ width: 48, height: 48, fontSize: 40 }}
        >
          <Icon icon="bi:image-fill" />
        </Stack>
      )}
    </>
  );
}
