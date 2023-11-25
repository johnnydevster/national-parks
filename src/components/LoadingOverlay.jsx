import { LoadingOverlay as MantineLoadingOverlay } from "@mantine/core";
import colors from "tailwindcss/colors";

export default function LoadingOverlay({ ...props }) {
  return (
    <MantineLoadingOverlay
      visible={true}
      loaderProps={{
        color: colors.slate[800],
        size: 48,
        radius: "xl",
        thickness: 3,
      }}
      overlayProps={{
        color: colors.slate[900],
        opacity: 0.2,
      }}
      {...props}
    />
  );
}
