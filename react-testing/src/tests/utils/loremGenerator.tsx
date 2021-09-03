/**
 * @description Lorem*20
 */
const paragraph = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur quibusdam harum asperiores fugit ut explicabo rem ad nesciunt unde illo dolorem dolorum nam iste maxime minima, fuga sequi ipsum alias!
Ipsam, nisi. Culpa libero quisquam dolores possimus? Commodi alias eligendi ut labore. Dolorum, excepturi quia incidunt molestiae sit dolores ipsa sed reiciendis alias modi assumenda qui quos, asperiores dignissimos minus.
Harum officiis assumenda consequatur doloremque, aperiam delectus suscipit, sequi sunt libero maxime magnam quis. Praesentium ad aspernatur velit iste fugit quod adipisci deserunt possimus beatae recusandae, enim voluptatibus minus commodi.
Dolorum omnis ipsa molestiae atque officiis ex quibusdam sequi corporis! Dolores modi beatae molestiae molestias voluptate quisquam cupiditate quo accusantium? Nesciunt voluptatem suscipit deserunt necessitatibus dolorem dolores non optio natus!
Provident officiis error alias molestias natus assumenda dolores culpa animi eveniet doloribus officia cupiditate, iure repellendus fuga adipisci fugiat odit perferendis cum consequuntur quibusdam temporibus itaque asperiores sapiente tenetur! Ipsum.
Ipsa, sunt quia saepe blanditiis dolore eius repellat illum ab sed dolor eos suscipit inventore, nihil perspiciatis. Eveniet, aliquid. Debitis sequi optio quasi quis! Quasi totam assumenda voluptate suscipit a!
Aliquid minima dicta corrupti voluptate. Explicabo ea fuga maiores, autem nostrum illum nemo debitis quis voluptates exercitationem ipsum libero, amet veniam eveniet optio in unde sed vero hic ullam? Nemo.
Eius numquam fugiat debitis unde provident neque sit, temporibus qui nam harum magni, vitae beatae ad? Omnis velit explicabo itaque minus qui aperiam maxime vitae reprehenderit odit impedit! Qui, id!
Eaque, voluptatibus adipisci totam aliquam ut deserunt sed excepturi architecto delectus nobis, dolore minus iure consequuntur dolorum nemo cupiditate hic illo consequatur ex magni labore earum. Rerum odit amet eum!
Vitae modi quia, veritatis alias, quisquam nam laborum amet dolore quas magnam fugiat exercitationem natus mollitia libero blanditiis facere ducimus quos, nihil debitis? In numquam deleniti praesentium tenetur non blanditiis.
Sapiente incidunt error consectetur aperiam hic id eum, similique voluptatum aliquid mollitia sit laborum fugiat possimus quaerat sed eius veniam praesentium. Fugiat libero consequatur cum sit adipisci distinctio exercitationem quae!
Deserunt fugit cum, vero odio natus nulla dolores repellendus. Distinctio magni, perferendis rerum at voluptate voluptatum, similique delectus cum atque odit quo ab exercitationem ex. Ipsum atque corporis doloribus reiciendis.
Nesciunt atque dolor, nisi ullam magni, magnam itaque voluptatem explicabo porro culpa deleniti architecto fugiat. Quaerat nesciunt aut, velit hic ipsum, nemo distinctio modi, dolor assumenda aliquid quisquam. Odio, a?
Possimus autem earum expedita ex unde ratione voluptatibus incidunt hic impedit alias aliquam aperiam molestiae officia ducimus ad nobis, inventore numquam explicabo libero natus eos! A molestias natus harum eos.
Necessitatibus quas provident voluptate ducimus quae quos nemo odit sit cumque similique ab repellendus placeat voluptates, odio in neque? Aliquam libero obcaecati perferendis excepturi dolore at autem assumenda deleniti iure.
Fuga maxime nobis pariatur, animi nemo suscipit itaque quaerat dolorum, ex tenetur, facere eaque? Deserunt, dignissimos? Labore quia fugit illum, consequuntur at exercitationem corporis, natus commodi rem voluptatem molestiae asperiores.
Adipisci doloribus laboriosam praesentium nulla, nobis a minus cumque veniam rem. Incidunt in ex nobis recusandae laboriosam assumenda, quos earum, necessitatibus, quia similique itaque! Est facilis sint necessitatibus ad veniam!
Hic odio alias repudiandae atque perspiciatis, dignissimos, similique odit sequi id laudantium ea adipisci explicabo saepe quisquam quis aliquam voluptatem repellat laboriosam reprehenderit recusandae. Id porro accusamus eius magni nobis.
Nesciunt animi sit facere esse fugit enim quidem voluptates, architecto iste, ratione itaque accusantium temporibus? Consequatur harum temporibus obcaecati recusandae rem ipsa mollitia, exercitationem dolores reiciendis neque odit omnis architecto.
Provident at officia voluptas minima est voluptatum! Optio veritatis iste nisi fugit molestias blanditiis dolorem asperiores debitis porro ea dolorum aspernatur laborum amet, velit est exercitationem ducimus ipsum quae similique.`

const loremGenerator = (maxSymbols: number): string => {
    return paragraph.slice(0, maxSymbols)
}

export const findNearestDotPosition = (findFrom: number): number => {
    const point = paragraph.indexOf('.', findFrom)
    return point
}

export default loremGenerator
