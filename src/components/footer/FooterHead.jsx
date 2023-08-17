import MenuItems from './MenuItems';
import FooterInfo from './FooterInfo';

const FooterHead = () => {
  return (
    <div className='container'>
      <div className='row'>
        <FooterInfo />
        <MenuItems />
      </div>
    </div>
  );
};

export default FooterHead;
