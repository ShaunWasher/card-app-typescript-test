import { server } from "../src/server"
import Prisma from "../src/db";

describe("server test", () => {
  it("should assert 1 + 1 is 2", () => {
    expect(1 + 1).toEqual(2);
  });

  it("should respond to a GET request", async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/get/'
    })
    expect(response.statusCode).toEqual(200);
  });

  it("should create and delete an element", async () => {
    const responseCreate = await server.inject({
      method: 'POST',
      url: '/create/',
      payload: {title: "test card", description: "description", created_at: "2024-10-28", scheduled_date: "2024-10-28"}
    })
    expect(responseCreate.statusCode).toEqual(200);
    const card = await Prisma.entry.findFirst({
      where: {title: "test card", description: "description", created_at: new Date("2024-10-28"), scheduled_date: new Date("2024-10-28")},
    });
    expect(card).not.toBeNull();
    const responseDelete = await server.inject({
      method: 'DELETE',
      url: '/delete/'+card?.id.toString()
    })
    expect(responseDelete.statusCode).toEqual(200);
    const deletedCard = await Prisma.entry.findFirst({
      where: {title: "test card", description: "description", created_at: new Date("2024-10-28"), scheduled_date: new Date("2024-10-28")},
    });
    expect(deletedCard).toBeNull();
  });
});
