import { Link } from "react-router-dom";
import { IDefaultCompProps } from "../../utils/interfaces";

export default function Header({ className = "" }: IDefaultCompProps) {
  return (
    <header className={className}>
      <div className="container max-w-8xl mx-auto py-8 px-8 lg:px-4 xl:px-0">
        <div className="flex justify-center lg:justify-start">
          <Link to="/">
            <img src="/assets/images/logo.png" className="w-24 lg:w-36" />
          </Link>
        </div>
      </div>
    </header>
  );
}
