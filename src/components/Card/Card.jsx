export default function Card({ card, onCardClick }) {
    return (
        //<li className="elements__item">
            <article className="elements__list">
                <button className="elements__remove" type="button" />
                <img className="elements__image" 
                alt={`Изображение ${card.name}`} 
                src={card.link} 
                onClick={() => onCardClick({link: card.link, name: card.name})}/>
                <div className="elements__group">
                    <h2 className="elements__title">{card.name}</h2>
                    <div className="elements__container">
                        <button className="elements__like" type="button" />
                        <p className="elements__counter" />
                    </div>
                </div>
            </article>
        //</li>
    )
}