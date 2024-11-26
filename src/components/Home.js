import Header from "./Header";

const Home = () => {
    return (
        <>
            <Header />
            <div style={{paddingTop: '20px'}}>
                <h1 style={{textAlign: 'center', fontSize: '50px', fontWeight: '800'}}>Welcome!</h1>
                <h4 style={{textAlign: 'center',marginTop: '5px'}}>This is the Home Page</h4>
            </div>
        </>
    );
};

export default Home;