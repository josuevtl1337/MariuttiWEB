import React from 'react'
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import HeroImageSmall from "../../layout/HeroImageSmall"
import EntradaCard from './EntradaCard'

const Noticias = () => {
    return(
        <React.Fragment>

            <HeroImageSmall
                title="Noticias"
                image="https://image.shutterstock.com/z/stock-photo-industrial-factory-in-mechanical-engineering-for-the-manufacture-of-transformers-interior-of-a-1064126297.jpg"
            />

            <Container>

                {/* Listado de todas las noticias */}
                <div className="listado-entradas">
                    <EntradaCard
                        img="https://baumeister.qodeinteractive.com/wp-content/uploads/2017/11/blog-post-2.jpg"
                        title="Soft Wood Examples"
                        date="25 de Marzo, 2020"
                        text="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna liqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
                    />
                    <Divider/>
                    <EntradaCard
                        img="https://baumeister.qodeinteractive.com/wp-content/uploads/2017/11/blog-post-3.jpg"
                        title="Laminate Flooring Ideas"
                        date="24 de Marzo, 2020"
                        text="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna liqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
                    />
                </div>
                
                
            </Container>
            

            
        </React.Fragment>
        
    )
}

export default Noticias