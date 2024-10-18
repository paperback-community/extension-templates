import {
  BasicRateLimiter,
  Chapter,
  ChapterDetails,
  ChapterProviding,
  ContentRating,
  DiscoverSection,
  DiscoverSectionItem,
  DiscoverSectionType,
  Extension,
  Form,
  MangaProviding,
  PagedResults,
  PaperbackInterceptor,
  Request,
  Response,
  SearchQuery,
  SearchResultItem,
  SearchResultsProviding,
  SettingsFormProviding,
  SourceManga,
  Tag,
  TagSection,
} from "@paperback/types";

import { SettingsForm } from "./SettingsForm";

// Should match the capabilities which you defined in pbconfig.ts
type ContentTemplateImplementation = SettingsFormProviding &
  Extension &
  SearchResultsProviding &
  MangaProviding &
  ChapterProviding;

// Intercepts all the requests and responses and allows you to make changes to them
class MainInterceptor extends PaperbackInterceptor {
  override async interceptRequest(request: Request): Promise<Request> {
    return request;
  }

  override async interceptResponse(
    request: Request,
    response: Response,
    data: ArrayBuffer,
  ): Promise<ArrayBuffer> {
    return data;
  }
}

// Main extension class
export class ContentTemplateExtension implements ContentTemplateImplementation {
  // Implementation of the main rate limiter
  mainRateLimiter = new BasicRateLimiter("main", {
    numberOfRequests: 15,
    bufferInterval: 10,
    ignoreImages: true,
  });

  // Implementation of the main interceptor
  mainInterceptor = new MainInterceptor("main");

  // Method from the Extension interface which we implement, initializes the rate limiter, interceptor, discover sections and search filters
  async initialise(): Promise<void> {
    this.mainRateLimiter.registerInterceptor();
    this.mainInterceptor.registerInterceptor();

    //Template Discover section, needs to be populated via its own method
    Application.registerDiscoverSection(
      {
        id: "discover-section-template",
        title: "Discover Section Template",
        type: DiscoverSectionType.simpleCarousel,
      },
      Application.Selector(
        this as ContentTemplateExtension,
        "getDiscoverSectionTemplate",
      ),
    );

    // Template search filter
    Application.registerSearchFilter({
      id: "search-filter-template",
      type: "dropdown",
      options: [
        { id: "A", value: "A" },
        { id: "B", value: "B" },
      ],
      value: "A",
      title: "Search Filter Template",
    });
  }

  // Implements the settings form, check SettingsForm.ts for more info
  async getSettingsForm(): Promise<Form> {
    return new SettingsForm();
  }

  // Populates search
  async getSearchResults(
    query: SearchQuery,
    metadata?: number,
  ): Promise<PagedResults<SearchResultItem>> {
    void query;
    void metadata;

    return {
      items: [
        {
          mangaId: "1",
          title: "Template Title 1",
          subtitle: "Template Title 1",
          imageUrl: "https://placehold.co/200x300.png",
        },
        {
          mangaId: "2",
          title: "Template Title 2",
          subtitle: "Template Title 2",
          imageUrl: "https://placehold.co/200x300.png",
        },
        {
          mangaId: "3",
          title: "Template Title 3",
          subtitle: "Template Title 3",
          imageUrl: "https://placehold.co/200x300.png",
        },
        {
          mangaId: "4",
          title: "Template Title 4",
          subtitle: "Template Title 4",
          imageUrl: "https://placehold.co/200x300.png",
        },
      ],
    };
  }

  // Populates the discover section
  async getDiscoverSectionTemplate(
    section: DiscoverSection,
    metadata: number | undefined,
  ): Promise<PagedResults<DiscoverSectionItem>> {
    void section;
    void metadata;

    return {
      items: [
        {
          mangaId: "1",
          title: "Template Title 1",
          subtitle: "Template Title 001",
          imageUrl: "https://placehold.co/200x300.png",
        },
        {
          mangaId: "2",
          title: "Template Title 2",
          subtitle: "Template Title 002",
          imageUrl: "https://placehold.co/200x300.png",
        },
        {
          mangaId: "3",
          title: "Template Title 3",
          subtitle: "Template Title 003",
          imageUrl: "https://placehold.co/200x300.png",
        },
        {
          mangaId: "4",
          title: "Template Title 4",
          subtitle: "Template Title 004",
          imageUrl: "https://placehold.co/200x300.png",
        },
      ],
    };
  }

  // Populate the manga details
  async getMangaDetails(mangaId: string): Promise<SourceManga> {
    return {
      mangaId,
      mangaInfo: {
        thumbnailUrl: "https://placehold.co/200x300.png",
        synopsis: "This is a synopsis.",
        primaryTitle: "Template Title 1",
        secondaryTitles: ["Template Title 001"],
        contentRating: ContentRating.EVERYONE,
        status: "Finished",
        author: "Celarye",
        bannerUrl: "https://placehold.co/600x400.png",
        rating: 1,
        tagGroups: [
          {
            id: "tags",
            title: "Tags",
            tags: [{ id: "tag-template", title: "Tag Template" } as Tag],
          } as TagSection,
        ],
        artworkUrls: [],
      },
    };
  }

  // Populate the chapter list
  async getChapters(
    sourceManga: SourceManga,
    sinceDate?: Date,
  ): Promise<Chapter[]> {
    void sinceDate;

    return [
      {
        chapterId: "1",
        sourceManga,
        langCode: "EN",
        chapNum: 1,
      },
      {
        chapterId: "2",
        sourceManga,
        langCode: "EN",
        chapNum: 2,
      },
      {
        chapterId: "3",
        sourceManga,
        langCode: "EN",
        chapNum: 3,
      },
      {
        chapterId: "4",
        sourceManga,
        langCode: "EN",
        chapNum: 4,
      },
    ];
  }

  // Populate a chapter
  async getChapterDetails(chapter: Chapter): Promise<ChapterDetails> {
    void chapter;

    return {
      id: "1",
      mangaId: "1",
      pages: [
        "https://placehold.co/800x1200.png",
        "https://placehold.co/800x1200.png",
        "https://placehold.co/800x1200.png",
      ],
    };
  }
}

export const ContentTemplate = new ContentTemplateExtension();
