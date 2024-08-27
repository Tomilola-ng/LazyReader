import { _siteDetails } from "./config";

export function _formatNumberToMoney(number: number) {
  return Intl.NumberFormat("en-US").format(number);
}

export default function _slugify(str: string) {
  str = str.replace(/^\s+|\s+$/g, "");
  str = str.toLowerCase();
  str = str
    .replace(/[^a-z0-9 -]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return str;
}

export const _handleShare = (path: string) => {
  if (navigator.share) {
    navigator.share({
      url: _siteDetails.domain + path,
    });
  }
};
