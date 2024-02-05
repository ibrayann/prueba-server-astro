import { useEffect, useState } from 'react'
import CardReact from '../cards/CardReact'
import CardLoading from '../cards/CardLoading'

const InitialCategorias = [
  {
    categoria: 'medicina-uno',
    descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
    subcategorias: ['Anatomía', 'Farmacología', 'Patología']
  },
  {
    categoria: 'Programación-uno',
    descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
    subcategorias: ['JavaScript', 'Python', 'Java']
  },
  {
    categoria: 'Cocina-uno',
    descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
    subcategorias: ['Postres', 'Platos principales', 'Bebidas']
  },
  {
    categoria: 'medicina-uno',
    descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
    subcategorias: ['Anatomía', 'Farmacología', 'Patología']
  },
  {
    categoria: 'Programación-uno',
    descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
    subcategorias: ['JavaScript', 'Python', 'Java']
  },
  {
    categoria: 'Cocina-uno',
    descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
    subcategorias: ['Postres', 'Platos principales', 'Bebidas']
  }
]

const AllTemas = () => {
  const [categorias, setCategorias] = useState(InitialCategorias)
  const [cargando, setCargando] = useState(true)

  return (
    <>
      <article className="grid md:grid-cols-3 grid-cols-1 gap-10">
        {categorias.map((post, index) => (
          <CardReact
            key={index}
            title={post.categoria}
            content={post.descripcion}
            to={`/${post.categoria}`}
          />
        ))}
      </article>
    </>
  )
}

export default AllTemas
