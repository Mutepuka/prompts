import Feeds from "@components/Feeds";

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'> 
      Discover and Share
      <br className='max-md:hidden'/>
      <span className='orange_gradient text-center'>AI-powered prompts</span>
      </h1>
      <p className='desc text-center'>SharePrompt is a website that allows users to discover , create and share creative prompts</p>
      <Feeds/>
      </section>
  )
}

export default Home