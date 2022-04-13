import { useMemo } from "react";
import Button from "./button";
import UpSvg from '../assets/icons/up.svg';
import DownSvg from '../assets/icons/down.svg';
import LeftSvg from '../assets/icons/left.svg';
import RightSvg from '../assets/icons/right.svg';

export default function ToggleButton({ on = false, direction = 'down', ...props }) {
  const Icon = useMemo(() => {
    switch (direction) {
      case 'right':
        return on ? LeftSvg : RightSvg;
      case 'left':
        return !on ? LeftSvg : RightSvg;
      case 'up':
        return !on ? UpSvg : DownSvg;
      default:
        return on ? UpSvg : DownSvg;
    }
  }, [on, direction]);

  return (<Button {...props} onlyIcon={true} icon={(<Icon/>)} />);
}
