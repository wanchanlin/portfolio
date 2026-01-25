import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Projects')
        .icon(() => '📁')
        .child(
          S.documentTypeList('project')
            .title('Projects')
            .filter('_type == "project"')
        ),
      S.listItem()
        .title('Authors')
        .icon(() => '👤')
        .child(
          S.documentTypeList('author')
            .title('Authors')
            .filter('_type == "author"')
        ),
      S.divider(),
      // Add any additional document types that aren't handled above
      ...S.documentTypeListItems().filter(
        (item) => !['project', 'author'].includes(item.getId()!)
      ),
    ])
