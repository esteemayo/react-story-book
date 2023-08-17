import MenuItem from './MenuItem';

const MenuItems = () => {
  return (
    <div className='col l4 offset-l2 s12'>
      <h5 className='white-text'>Links</h5>
      <ul>
        <MenuItem path='/stories' label='Public Stories' />
        <MenuItem path='/about' label='About' />
      </ul>
    </div>
  );
};

export default MenuItems;
