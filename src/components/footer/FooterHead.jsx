import MenuItems from './MenuItems'

const FooterHead = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col l6 s12'>
          <h5 className='white-text'>StoryBooks</h5>
          <p className='grey-text text-lighten-4'>
            Share your life with the world
          </p>
        </div>
        <MenuItems />
      </div>
    </div>
  );
};

export default FooterHead;
