import { html, fixture, expect } from '@open-wc/testing';
import "../Project-1.js";

describe("Project1 test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <Project-1
        title="title"
      ></Project-1>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
