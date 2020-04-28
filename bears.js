import React from 'react';
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

//  Queryet som brukes:
const getBearsQuery = gql`
{
  catalogue(path: "/teddy-bears", language: "en") {
    id
    name
    children {
      ... on Product {
        id
        name
        variants {
          price
          name
          stock
          images {
            url
          }
        }
      }
    }
  }
} 
`
//  Funksjonen vurderer resultatet fra GraphQL-spørringen, og spytter ut HTML-koden:
function Bears() {
        const { loading, error, data } = useQuery(getBearsQuery);
        if (loading) return 'Loading';
        if (error) return 'Query error!!';

        console.log(data.catalogue.children);

        var queryToHTML = data.catalogue.children.map(child => (    //  Looper gjennom children-arrayet i katalogen, og binder verdiene til 'child'
          <div key={child.id} className='bearType'> 
          
            <h2>{child.name}</h2> 
            <div className='bearVariants'>                       
            
              {child.variants.map(variant => (                      // Looper gjennom alle variantene av bjørnen, og renderer informasjonen som passende HTML-kode
                <div className='bearVariant' key={variant.images[0].url}>
                  
                  <img src={variant.images[0].url} alt={child.name} className='bearPic'></img>
                  <h3>{variant.name}</h3>
                  {
                    variant.stock < 6 && <p className='stockWarning'>Only {variant.stock} left</p>    // Hvis beholdningen er under 6, vises det en advarsel
                  }
                  <h4>{variant.price}$</h4>

                </div>
              ))
              }
          
            </div>
          </div>
        ))

        return (
        <div className = "catalogue">
                <h1>{data.catalogue.name}</h1>

                {queryToHTML}   {/* Her printes resultet fra queryToHTML-varibalen, som vi genererte ovenfor */}

        </div>
        );
}

export default Bears;
