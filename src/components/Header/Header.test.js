import Header from ".";


describe("Header Component tests", ()=>{

    it("render correctly", async ()=>{

        render(<Header/>);
        const ele = await screen.getByText("Customer");
        expect(ele).toBeInDocument();

    })
})
