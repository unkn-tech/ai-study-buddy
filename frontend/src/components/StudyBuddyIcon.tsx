import { SvgIcon, SvgIconProps } from '@mui/material';

export const StudyBuddyIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <defs>
      <linearGradient id="studyBuddyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#2E51ED' }} />
        <stop offset="100%" style={{ stopColor: '#7C3AED' }} />
      </linearGradient>
    </defs>
    <path
      fill="url(#studyBuddyGradient)"
      d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"
    />
    <path
      fill="currentColor"
      opacity="0.6"
      d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"
    />
  </SvgIcon>
);

export default StudyBuddyIcon; 