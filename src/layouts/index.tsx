import { Link, Outlet } from 'umi';
import styles from './index.less';
import Demo from '../demo/demo';
export default function Layout() {
  return (
    // <div className={styles.navs}>
    //   <ul>
    //     <li>
    //       <Link to="/">Home</Link>
    //     </li>
    //     <li>
    //       <Link to="/docs">Docs</Link>
    //     </li>
    //     <li>
    //       <Link to="/docs2">Rgiht</Link>
    //     </li>
    //   </ul>
    //   <Outlet />
    // </div>
    <Demo/>
  );
}
