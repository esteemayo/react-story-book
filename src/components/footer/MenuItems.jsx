import MenuItem from './MenuItem';

const MenuItems = () => {
  return (
    <ul>
      <MenuItem path='/stories' label='Public Stories' />
      <MenuItem path='/about' label='About' />
    </ul>
  );
};

export default MenuItems;
